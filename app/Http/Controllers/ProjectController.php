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

        $data['created_by'] = Auth::id(); // optional, if you track creator

        // Backend will handle slug and instructions
        $project = Project::query()->create($data);

        // create vector store id


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
