<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Employee Field Options
    |--------------------------------------------------------------------------
    |
    | Single source of truth for the select-style employee fields. Used both
    | for server-side validation and exposed via the API so the frontend can
    | render matching dropdown options without duplicating the lists.
    |
    */

    'genders' => ['Male', 'Female', 'Other'],

    'marital_statuses' => ['Single', 'Married', 'Divorced', 'Widowed'],

    'departments' => [
        'Human Resources',
        'Finance',
        'Information Technology',
        'Sales',
        'Marketing',
        'Operations',
        'Customer Support',
        'Legal',
    ],

];
