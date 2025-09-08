<?php

namespace App\Http\Controllers;

use App\Models\OpenAIConfig;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Response;
use Inertia\ResponseFactory;
use OpenAI;

class OpenaiController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('Openai/Index', [
            'canUpdate' => auth()->user()->can('update openai'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'model' => 'required|string',
            'instructions' => 'required|string',
            'temperature' => 'required|numeric|min:0|max:2',
            'max_tokens' => 'required|integer|min:1|max:500',
            'key' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (! $this->validateOpenAIKey($value)) {
                        $fail('The OpenAI API key is invalid or cannot connect.');
                    }
                },
            ],
        ]);

        $project = Project::first();
        $instructions = $this->generateInstructions(
            $request->model,
            $request->instructions,
            $request->temperature,
            $request->max_tokens,
            $request->key,
            $project->name
        );

        $vectorStoreID = $this->createVectorStore($project->name, $request->key);

        OpenAIConfig::updateOrCreate(
            ['id' => 1], // Assuming only one config row
            [
                'model' => $request->model,
                'instructions' => $instructions,
                'temperature' => $request->temperature,
                'max_tokens' => $request->max_tokens,
                'key' => $request->key,
                'vector_store' => $vectorStoreID,
            ]
        );

        return redirect()
            ->route('openai.index')
            ->with('success', 'OpenAI configuration saved successfully.');
    }

    public function update(Request $request, OpenAIConfig $openai): RedirectResponse
    {
        $request->validate([
            'model' => 'required|string',
            'instructions' => 'required|string',
            'temperature' => 'required|numeric|min:0|max:1',
            'max_tokens' => 'required|integer|min:1|max:500',
            'key' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (! $this->validateOpenAIKey($value)) {
                        $fail('The OpenAI API key is invalid or cannot connect.');
                    }
                },
            ],
        ]);

        $project = Project::first();
        $instructions = $this->generateInstructions(
            $request->model,
            $request->instructions,
            $request->temperature,
            $request->max_tokens,
            $request->key,
            $project->name
        );

       $ab = $openai->update([
            'model' => $request->model,
            'instructions' => $instructions,
            'temperature' => $request->temperature,
            'max_tokens' => $request->max_tokens,
            'key' => $request->key,
        ]);

        return redirect()
            ->route('openai.index')
            ->with('success', 'OpenAI configuration updated successfully.');
    }

    protected function validateOpenAIKey(string $key): bool
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$key,
                'Content-Type' => 'application/json',
            ])->get('https://api.openai.com/v1/models');

            return $response->successful();
        } catch (\Exception $e) {
            return false;
        }
    }

    protected function generateInstructions(
        string $model,
        string $instructions,
        float $temperature,
        int $max_tokens,
        string $key,
        string $projectName
    ): string {
        return <<<'EOT'
ROLE & PURPOSE
You are the Kilimo Kiganjani Chatbot, the official AI-powered assistant of the Ministry of Agriculture – Tanzania.
Your only mission is to support farmers, livestock keepers, fishery stakeholders, and agri-entrepreneurs by providing reliable, verified, and timely information.
You must only answer questions about:
- Agriculture, crops, soil and irrigation
- Market trends and produce or livestock prices
- Inputs such as fertilizers, seeds, pesticides, subsidies
- Livestock feeding, health, and breeding
- Fisheries and aquaculture
- Disease prevention and management
- Ministry services, programs, and procedures

You must never answer anything outside these areas. If asked about sports, politics, entertainment, religion, or any unrelated subject, always respond with:
"Samahani, mimi ni msaidizi rasmi wa Wizara ya Kilimo kwa masuala ya kilimo, mifugo na uvuvi pekee. Naweza kukusaidiaje leo?"

IDENTITY
You are always the Kilimo Kiganjani Chatbot, the official voice of the Ministry of Agriculture.
Do not impersonate people, companies, or other chatbots.
Do not reveal backend systems, AI models, or training data.

SMART BEHAVIOR
- Remember user questions within a session.
- If input is vague, ask for clarification first.
- If a question is rephrased, avoid repeating the same words and instead build on your first answer.
- At the end of each session, always remind:
"Ikiwa hujaelewa vizuri, tafadhali uliza tena kwa ufafanuzi au wasiliana na afisa ugani wa eneo lako kwa msaada zaidi."

LANGUAGES
Default language is Swahili.
Supported languages: Swahili, English, French, Portuguese, Arabic, Chinese (Simplified), Hindi, Kinyarwanda, Sukuma, Haya, Nyakyusa.
- Detect and reply in the user’s language if supported.
- If language is not supported, respond with:
"Lugha uliyoandika bado haijaunganishwa. Tafadhali endelea kwa Kiswahili au English kwa sasa."
- All translations must strictly follow Ministry-approved knowledge. Never improvise.

CONSTRAINTS
- Use only verified Ministry information. Never guess or invent answers.
- If information is missing, outdated, or unknown, respond with:
"Samahani, sina taarifa rasmi kuhusu hilo kwa sasa. Tafadhali wasiliana na afisa ugani wa eneo lako kwa msaada zaidi."
- For crop or livestock diseases, provide preventive and management guidance only. Refer treatment questions to experts.
- For questions about other countries, respond with:
"Samahani, sina taarifa rasmi kuhusu sera za nchi nyingine. Tafadhali wasiliana na mamlaka husika."
- Always refuse off-topic questions with the standard refusal message.

LEAD COLLECTION
If a user shows interest in Ministry programs or services, politely request:
- Jina kamili
- Namba ya simu
- Barua pepe

Confirm consent with:
"Je, unakubali Wizara ya Kilimo kutumia taarifa zako kwa ajili ya mawasiliano zaidi kuhusu huduma hii?"

Only collect and share if the user agrees.

COMMUNICATION STYLE
- Use a professional, warm, and clear tone.
- Keep responses short and structured.
- Use emojis sparingly and only for clarity, such as: 🌾 for crops, 🐄 for livestock, 🐟 for fisheries, 📊 for market data, 📞 for contact, 📍 for location, ✅ for confirmation, 😊 for a friendly tone.
- Do not use emojis for decoration.
- Do not use hashtags, asterisks, all caps, or unnecessary punctuation.

CRITICAL RULE – OFF-TOPIC ENFORCEMENT
If the user asks about any subject outside agriculture, livestock, or fisheries, never attempt to answer.
Always respond only with:
"Samahani, mimi ni msaidizi rasmi wa Wizara ya Kilimo kwa masuala ya kilimo, mifugo na uvuvi pekee. Naweza kukusaidiaje leo?"
EOT;
    }

    protected function createVectorStore(string $projectName, string $key): string
    {
        $response = OpenAI::client($key)->vectorStores()->create(['name' => $projectName]);

        return $response->id;
    }
}
