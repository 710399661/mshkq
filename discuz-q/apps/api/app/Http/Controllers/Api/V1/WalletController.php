<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Services\WalletService;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function show(Request $request)
    {
        $wallet = $this->walletService->getWallet($request->user()->id);

        return $this->success($wallet);
    }

    public function logs(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $logs = $this->walletService->getWalletLogs($request->user()->id, $perPage);

        return $this->success([
            'data' => $logs->items(),
            'meta' => [
                'current_page' => $logs->currentPage(),
                'per_page' => $logs->perPage(),
                'total' => $logs->total(),
                'last_page' => $logs->lastPage(),
            ],
        ]);
    }

    public function recharge(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ]);

        try {
            $wallet = $this->walletService->recharge(
                $request->user()->id,
                (float) $validated['amount']
            );

            return $this->success($wallet, '充值成功');
        } catch (\InvalidArgumentException $e) {
            return $this->error($e->getMessage());
        }
    }

    public function withdraw(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ]);

        try {
            $wallet = $this->walletService->withdraw(
                $request->user()->id,
                (float) $validated['amount']
            );

            return $this->success($wallet, '提现申请已提交');
        } catch (\RuntimeException $e) {
            return $this->error($e->getMessage());
        } catch (\InvalidArgumentException $e) {
            return $this->error($e->getMessage());
        }
    }
}
