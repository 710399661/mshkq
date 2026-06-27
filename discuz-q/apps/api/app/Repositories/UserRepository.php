<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function findByUsername(string $username)
    {
        return $this->model->where('username', $username)->first();
    }

    public function findByMobile(string $mobile)
    {
        return $this->model->where('mobile', $mobile)->first();
    }

    public function findByAccount(string $account)
    {
        return $this->model->where(function ($query) use ($account) {
            $query->where('username', $account)
                ->orWhere('email', $account)
                ->orWhere('mobile', $account);
        })->first();
    }

    public function findById(int $id)
    {
        return $this->model->find($id);
    }
}
