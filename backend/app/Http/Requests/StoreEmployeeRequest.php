<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(config('employee.genders'))],
            'marital_status' => ['required', Rule::in(config('employee.marital_statuses'))],
            'phone' => ['required', 'string', 'max:20', 'regex:/^[0-9+\-\s()]{7,20}$/'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'address' => ['required', 'string', 'max:500'],
            'date_of_birth' => ['required', 'date', 'before:-16 years'],
            'nationality' => ['required', 'string', 'max:100'],
            'hire_date' => ['required', 'date', 'after:date_of_birth'],
            'department' => ['required', Rule::in(config('employee.departments'))],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'The phone number format is invalid.',
            'date_of_birth.before' => 'Employee must be at least 16 years old.',
            'hire_date.after' => 'The hire date must be after the date of birth.',
        ];
    }
}
