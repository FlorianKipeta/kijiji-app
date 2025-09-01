<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Inertia\ResponseFactory;
use OpenAI\Laravel\Facades\OpenAI;

class ProjectController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view projects'), 403);

        return inertia('Project/Index', [
            'canCreate' => auth()->user()->can('create projects'),
            'canEdit' => auth()->user()->can('edit projects'),
            'canDelete' => auth()->user()->can('delete projects'),
            'canAssign' => auth()->user()->can('add project to groups'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_if(auth()->user()->cannot('create projects'), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:projects'],
            'purpose' => ['required', 'string'],
            'model' => ['required', 'string', 'max:100'],
        ]);

        $vector = OpenAI::vectorStores()->create([
            'name' => $request->name,
        ]);

        $data['created_by'] = Auth::id();
        $data['vector_store'] = $vector->id;

        $sampleOutput = <<<'EOT'
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

        $whatIsNeeded = 'Generate instructions for the project. The purpose of the project is: '
            .$request->purpose
            .'. The sample output is: '
            .$sampleOutput
            .'. The required output should follow this format, but adapted specifically to the given purpose, supported language are only swahili and english';

        $instructions = OpenAI::responses()->create([
            'model' => $request->model,
            'input' => $whatIsNeeded,
            'max_output_tokens' => 500,
            'temperature' => 0.7,
        ]);

        $generatedText = $instructions->output[0]->content[0]->text ?? '';

        $data['instructions'] = $generatedText;

        $project = Project::query()->create($data);

        return back()->with('success', 'Project created successfully');
    }

    public function show(Project $project): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view projects'), 403);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        abort_if(auth()->user()->cannot('edit projects'), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('projects', 'name')->ignore($project->id)],
            'purpose' => ['required', 'string'],
            'model' => ['required', 'string', 'max:100'],
        ]);

        // Backend will handle updating slug and instructions if needed
        $project->update($data);

        return back()->with('success', 'Project updated successfully');
    }

    public function destroy(Project $project): RedirectResponse
    {
        abort_if(auth()->user()->cannot('delete projects'), 403);

        $project->delete();

        return back()->with('success', 'Project deleted successfully');
    }
}
