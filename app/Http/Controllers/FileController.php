<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use App\Services\FileConverterService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use OpenAI\Laravel\Facades\OpenAI;

class FileController extends Controller
{
    public function store(Request $request, Project $project): RedirectResponse
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

        $path = "project_files/{$project->id}/{$fileName}";
        Storage::disk('local')->put($path, $text);

        $absolutePath = storage_path("app/private/{$path}");

        $openAiFile = OpenAI::files()->upload([
            'file' => fopen($absolutePath, 'r'),
            'purpose' => 'assistants',
        ]);

        if (! $project->vector_store) {
            $vectorStore = OpenAI::vectorStores()->create([
                'name' => "Project {$project->id} Store",
            ]);

            $project->update(['vector_store' => $vectorStore->id]);
        }

        OpenAI::vectorStores()->files()->create($project->vector_store, [
            'file_id' => $openAiFile->id,
        ]);

        File::query()->create([
            'name' => $fileName, // converted .txt name
            'path' => $path,
            'file_id' => $openAiFile->id,
            'size' => strlen($text),
            'project_id' => $project->id,
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'File converted to TXT and uploaded successfully');

    }

    public function destroy(File $file): RedirectResponse
    {
        if (Storage::disk('public')->exists($file->path)) {
            Storage::disk('public')->delete($file->path);
        }

        OpenAI::files()->delete($file->file_id);

        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully');
    }
}
