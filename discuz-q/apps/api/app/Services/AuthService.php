<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

class AuthService extends BaseService
{
    protected $repository;

    public function __construct(UserRepository $userRepository)
    {
        $this->repository = $userRepository;
    }

    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $data['name'] = $data['username'];
        return $this->repository->create($data);
    }

    public function login(array $credentials)
    {
        $user = $this->repository->findByAccount($credentials['account']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return null;
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function logout($user): bool
    {
        $user->currentAccessToken()->delete();
        return true;
    }
}
