@component('mail::message')
    # Tender Updated

    A note has been added to Tender: **{{ $tender->title }}**

    @component('mail::button', ['url' => route('tenders.show', $tender->id)])
        View Tender
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
