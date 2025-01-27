<?php

use PHPUnit\Framework\TestCase;
use Src\Model\UserCard;

class UserCardSQLiteIntegrationTest extends TestCase
{
    private $db;
    private $userCard;

    protected function setUp(): void
    {
        $this->db = new PDO('sqlite::memory:');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->db->exec("
            CREATE TABLE user_card_view (
                card_number TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                account_balance REAL NOT NULL
            )
        ");

        $this->db->exec("
            INSERT INTO user_card_view (card_number, full_name, account_balance) 
            VALUES 
            ('1234567890123456', 'John Doe', 1000.00),
            ('9876543210987654', 'Jane Smith', 2000.00)
        ");

        $databaseMock = $this->createMock(\Src\Config\Database::class);
        $databaseMock->method('getConnection')->willReturn($this->db);

        $this->userCard = new UserCard();
        $reflection = new ReflectionProperty(UserCard::class, 'db');
        $reflection->setAccessible(true);
        $reflection->setValue($this->userCard, $this->db);
    }

    public function testGetCardByNumber()
    {
        $card = $this->userCard->getCardByNumber('1234567890123456');
        
        $this->assertIsArray($card);
        $this->assertEquals('John Doe', $card['full_name']);
        $this->assertEquals(1000.00, $card['account_balance']);
    }

    public function testUpdateAccountBalance()
    {
        $result = $this->userCard->updateAccountBalance('John Doe', 1200.00);

        $this->assertTrue($result);

        $stmt = $this->db->query("SELECT account_balance FROM user_card_view WHERE full_name = 'John Doe'");
        $newBalance = $stmt->fetchColumn();

        $this->assertEquals(1200.00, $newBalance);
    }

    protected function tearDown(): void
    {
        $this->db = null;
    }
}
