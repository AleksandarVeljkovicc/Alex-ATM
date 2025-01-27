<?php
namespace Src\Model;

use Src\Config\Database;

class UserCard
{
    private $db;
    private $table = 'user_card_view';

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getCardByNumber($cardNumber): array|false
    {
        $stmt = $this->db->prepare("SELECT * FROM " . $this->table . " WHERE card_number = :card_number");
        $stmt->bindParam(':card_number', $cardNumber, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function updateAccountBalance($fullName, $newBalance): bool          
    {
        $stmt = $this->db->prepare("UPDATE " . $this->table . " SET account_balance = :account_balance WHERE full_name = :full_name");
        $stmt->bindParam(':account_balance', $newBalance, \PDO::PARAM_STR);
        $stmt->bindParam(':full_name', $fullName, \PDO::PARAM_STR);
        return $stmt->execute();
    }
}
