<?php

namespace App\Services;

use App\Repositories\WalletRepository;
use Illuminate\Support\Facades\DB;

class WalletService extends BaseService
{
    protected $repository;

    public function __construct(WalletRepository $walletRepository)
    {
        $this->repository = $walletRepository;
    }

    public function getWallet(int $userId)
    {
        return $this->repository->getOrCreate($userId);
    }

    public function getWalletLogs(int $userId, int $perPage = 20)
    {
        return $this->repository->getLogs($userId, $perPage);
    }

    public function recharge(int $userId, float $amount, string $description = '账户充值')
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('充值金额必须大于0');
        }

        return $this->repository->incrementBalance($userId, $amount, $description, 'recharge');
    }

    public function withdraw(int $userId, float $amount, string $description = '提现申请')
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('提现金额必须大于0');
        }

        $wallet = $this->repository->getByUserId($userId);
        if (!$wallet || $wallet->balance < $amount) {
            throw new \RuntimeException('余额不足');
        }

        return $this->repository->freeze($userId, $amount, $description, 'withdraw');
    }

    public function transfer(int $fromUserId, int $toUserId, float $amount, string $description = '转账')
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('转账金额必须大于0');
        }

        if ($fromUserId === $toUserId) {
            throw new \InvalidArgumentException('不能给自己转账');
        }

        return DB::transaction(function () use ($fromUserId, $toUserId, $amount, $description) {
            $fromWallet = $this->repository->decrementBalance($fromUserId, $amount, $description . '（转出）', 'transfer');
            if (!$fromWallet) {
                throw new \RuntimeException('余额不足');
            }

            $this->repository->incrementBalance($toUserId, $amount, $description . '（转入）', 'transfer');

            return true;
        });
    }

    public function pay(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('支付金额必须大于0');
        }

        $wallet = $this->repository->decrementBalance($userId, $amount, $description, $relatedType, $relatedId);
        if (!$wallet) {
            throw new \RuntimeException('余额不足');
        }

        return $wallet;
    }

    public function income(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('收入金额必须大于0');
        }

        return $this->repository->incrementBalance($userId, $amount, $description, $relatedType, $relatedId);
    }

    public function freeze(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('冻结金额必须大于0');
        }

        $wallet = $this->repository->freeze($userId, $amount, $description, $relatedType, $relatedId);
        if (!$wallet) {
            throw new \RuntimeException('余额不足');
        }

        return $wallet;
    }

    public function unfreeze(int $userId, float $amount, string $description = '', string $relatedType = null, int $relatedId = null)
    {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('解冻金额必须大于0');
        }

        $wallet = $this->repository->unfreeze($userId, $amount, $description, $relatedType, $relatedId);
        if (!$wallet) {
            throw new \RuntimeException('冻结余额不足');
        }

        return $wallet;
    }

    public function getBalance(int $userId): float
    {
        $wallet = $this->repository->getByUserId($userId);
        return $wallet ? (float) $wallet->balance : 0;
    }
}
