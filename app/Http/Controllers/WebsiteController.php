<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessWebsiteCrawl;
use App\Models\Website;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\ResponseFactory;

class WebsiteController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view websites'), 403);

        return inertia('Website/Index', [
            'canCreate' => auth()->user()->can('create websites'),
            'canEdit' => auth()->user()->can('edit websites'),
            'canDelete' => auth()->user()->can('delete websites'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|url',
        ]);

        ProcessWebsiteCrawl::dispatch($request->name);


        return redirect()->back()->with('success', 'Website content is downloading.');

    }

    public function destroy(Website $website): RedirectResponse
    {
        if (Storage::disk('public')->exists($website->path)) {
            Storage::disk('public')->delete($website->path);
        }

//        OpenAI::websites()->delete($website->website_id);

        $website->delete();

        return redirect()->back()->with('success', 'Website deleted successfully');
    }
}
