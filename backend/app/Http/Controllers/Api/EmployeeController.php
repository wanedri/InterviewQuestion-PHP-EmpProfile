<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Repositories\EmployeeRepository;
use Illuminate\Http\JsonResponse;

class EmployeeController extends Controller
{
    public function __construct(protected EmployeeRepository $employees)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => EmployeeResource::collection($this->employees->all()),
        ]);
    }

    public function store(StoreEmployeeRequest $request): JsonResponse
    {
        $employee = $this->employees->create($request->validated());

        return response()->json([
            'data' => new EmployeeResource($employee),
        ], 201);
    }

    public function options(): JsonResponse
    {
        return response()->json([
            'genders' => config('employee.genders'),
            'marital_statuses' => config('employee.marital_statuses'),
            'departments' => config('employee.departments'),
        ]);
    }
}
