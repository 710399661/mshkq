<?php

namespace App\Services;

abstract class BaseService
{
    protected $repository;

    public function all(array $columns = ['*'])
    {
        return $this->repository->all($columns);
    }

    public function find(int $id, array $columns = ['*'])
    {
        return $this->repository->find($id, $columns);
    }

    public function findOrFail(int $id, array $columns = ['*'])
    {
        return $this->repository->findOrFail($id, $columns);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function paginate(int $perPage = 15, array $columns = ['*'])
    {
        return $this->repository->paginate($perPage, $columns);
    }
}
