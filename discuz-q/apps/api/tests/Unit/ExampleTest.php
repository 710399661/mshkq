<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }

    public function test_basic_math_operations(): void
    {
        $this->assertEquals(4, 2 + 2);
        $this->assertEquals(6, 2 * 3);
        $this->assertEquals(2, 10 / 5);
        $this->assertEquals(1, 5 % 2);
    }

    public function test_string_operations(): void
    {
        $string = 'Hello, World!';

        $this->assertEquals(13, strlen($string));
        $this->assertEquals('HELLO, WORLD!', strtoupper($string));
        $this->assertEquals('hello, world!', strtolower($string));
        $this->assertStringContainsString('World', $string);
        $this->assertStringStartsWith('Hello', $string);
        $this->assertStringEndsWith('!', $string);
    }

    public function test_array_operations(): void
    {
        $array = [1, 2, 3, 4, 5];

        $this->assertCount(5, $array);
        $this->assertContains(3, $array);
        $this->assertEquals(15, array_sum($array));
        $this->assertEquals([5, 4, 3, 2, 1], array_reverse($array));
    }
}
