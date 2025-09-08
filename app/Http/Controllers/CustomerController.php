<?php

namespace App\Http\Controllers;

use App\Actions\GetCustomerLocation;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Inertia\ResponseFactory;

class CustomerController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view customers'), 403);

        return inertia('Customer/Index', [
            'canCreate' => auth()->user()->can('create customers'),
            'canEdit' => auth()->user()->can('edit customers'),
            'canDelete' => auth()->user()->can('delete customers'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_if(auth()->user()->cannot('create customers'), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'unique:customers'],
            'phone' => ['required', 'string', 'max:20', 'unique:customers'],
        ]);

        $data['country'] = (new GetCustomerLocation)->execute($request->phone);

        $customer = Customer::query()->create($data);

        return back()->with('success', 'Customer created successful');
    }

    public function show(Customer $customer): Response|ResponseFactory
    {
        abort_if(auth()->user()->cannot('view customers'), 403);

        return inertia('Customer/Show', [
            'customer' => new CustomerResource($customer),
        ]);

    }

    public function update(Request $request, Customer $customer): RedirectResponse
    {
        abort_if(auth()->user()->cannot('edit customers'), 403);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'string', 'max:20', Rule::unique('customers', 'phone')->ignore($customer->id)],
            'email' => ['nullable', 'email', Rule::unique('customers', 'email')->ignore($customer->id)],
        ]);

        $data['country'] = (new GetCustomerLocation)->execute($request->phone);

        $customer->update($data);

        return back()->with('success', 'Customer updated');
    }

    public function destroy(Customer $customer): RedirectResponse
    {
        abort_if(auth()->user()->cannot('delete customers'), 403);

        $customer->delete();

        return back()->with('success', 'Customer deleted');
    }
}
