<?php

namespace App\Repositories;

use Illuminate\Support\Str;

class EmployeeRepository
{
    protected string $path;

    public function __construct()
    {
        $this->path = storage_path('app/private/employees.json');
    }

    /**
     * Return all employees, most recently added first.
     */
    public function all(): array
    {
        $employees = $this->read();

        usort($employees, fn (array $a, array $b) => $b['created_at'] <=> $a['created_at']);

        return $employees;
    }

    /**
     * Persist a new employee record and return it.
     */
    public function create(array $data): array
    {
        $employee = array_merge($data, [
            'id' => (string) Str::uuid(),
            'created_at' => now()->toIso8601String(),
        ]);

        $handle = fopen($this->path, 'c+');

        if ($handle === false) {
            throw new \RuntimeException('Unable to open employee storage file.');
        }

        try {
            flock($handle, LOCK_EX);

            $contents = stream_get_contents($handle);
            $employees = $contents ? json_decode($contents, true) : [];
            $employees[] = $employee;

            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, json_encode(array_values($employees), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            fflush($handle);
            flock($handle, LOCK_UN);
        } finally {
            fclose($handle);
        }

        return $employee;
    }

    protected function read(): array
    {
        if (! file_exists($this->path)) {
            return [];
        }

        $contents = file_get_contents($this->path);

        if ($contents === false || trim($contents) === '') {
            return [];
        }

        return json_decode($contents, true) ?: [];
    }
}
