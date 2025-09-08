<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\OpenaiConfig;
use App\Models\Project;
use App\Services\FileConverterService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;
use OpenAI;

class FileController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view files'), 403);

        return inertia('File/Index', [
            'canCreate' => auth()->user()->can('create files'),
            'canEdit' => auth()->user()->can('edit files'),
            'canDelete' => auth()->user()->can('delete files'),
        ]);
    }
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,txt|max:10240', // only allowed types
        ]);

        $uploadedFile = $request->file('file');

        $converter = app(FileConverterService::class);

        $text = $converter->convertToText($uploadedFile);

        $originalName = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeName = Str::slug($originalName);
        $fileName = $safeName.'_'.time().'.txt';

        $path = "private/project_files/{$fileName}";
        Storage::disk('local')->put($path, $text);

        $absolutePath = storage_path("app/private/{$path}");

        $openAiFile = $this->uploadFileToVectorStore($absolutePath);

        File::query()->create([
            'name' => $fileName, // converted .txt name
            'path' => $path,
            'file_id' => $openAiFile,
            'size' => strlen($text),
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'File converted to TXT and uploaded successfully');

    }

    protected function uploadFileToVectorStore(string $path): string
    {
        $openAIConfig = OpenaiConfig::query()->first();

        if (!$openAIConfig) {
            return "No OpenAI configuration found.";
        }
        $openAIClient = OpenAI::client($openAIConfig->key);

        $response = $openAIClient->files()->upload([
            'file' => fopen($path, 'r'),
            'purpose' => 'assistants',
        ]);


        $openAIClient->vectorStores()->files()->create($openAIConfig->vector_store, [
            'file_id' => $response->id,
        ]);

        return $response->id;
    }

    public function destroy(File $file): RedirectResponse
    {
        if (Storage::disk('public')->exists($file->path)) {
            Storage::disk('public')->delete($file->path);
        }

//        OpenAI::files()->delete($file->file_id);

        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully');
    }
}
