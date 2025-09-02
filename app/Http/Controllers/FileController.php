<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use OpenAI\Laravel\Facades\OpenAI;

class FileController extends Controller
{
    public function store(Request $request, Project $project): RedirectResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240', // max 10MB
        ]);

        $uploadedFile = $request->file('file');

        $path = $uploadedFile->store("project_files/{$project->id}", 'public');
        $absolutePath = storage_path("app/public/{$path}");

        $openAiFile = OpenAI::files()->upload([
            'file' => fopen($absolutePath, 'r'),
            'purpose' => 'assistants',
        ]);

        if (!$project->vector_store) {
            $vectorStore = OpenAI::vectorStores()->create([
                'name' => "Project {$project->id} Store",
            ]);

            $project->update(['vector_store' => $vectorStore->id]);
        }

        OpenAI::vectorStores()->files()->create($project->vector_store, [
            'file_id' => $openAiFile->id,
        ]);

        File::query()->create([
            'name' => $uploadedFile->getClientOriginalName(),
            'path' => $path,
            'file_id' => $openAiFile->id, // stores OpenAI file id
            'size' => $uploadedFile->getSize(),
            'project_id' => $project->id,
            'created_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully');
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
