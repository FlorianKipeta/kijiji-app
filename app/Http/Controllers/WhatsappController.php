<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use OpenAI\Laravel\Facades\OpenAI;

class WhatsappController extends Controller
{
    public function store(Request $request, Project $project)
    {
        return $request->all();



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
