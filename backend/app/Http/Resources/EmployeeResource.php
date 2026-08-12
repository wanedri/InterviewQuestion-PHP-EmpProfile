<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource['id'],
            'name' => $this->resource['name'],
            'gender' => $this->resource['gender'],
            'marital_status' => $this->resource['marital_status'],
            'phone' => $this->resource['phone'],
            'email' => $this->resource['email'],
            'address' => $this->resource['address'],
            'date_of_birth' => $this->resource['date_of_birth'],
            'nationality' => $this->resource['nationality'],
            'hire_date' => $this->resource['hire_date'],
            'department' => $this->resource['department'],
            'created_at' => $this->resource['created_at'],
        ];
    }
}
