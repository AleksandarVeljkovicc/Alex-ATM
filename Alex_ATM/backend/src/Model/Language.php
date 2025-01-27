<?php
namespace Src\Model;

use Src\Config\Database;


class Language
{
    private $db;
    private $table = 'language';

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getLanguageTable(): array|false
    {
        $stmt = $this->db->prepare("SELECT language FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getLanguageByValue($value): array|false         
    {
        $stmt = $this->db->prepare("SELECT * FROM " . $this->table . " WHERE language = :language LIMIT 1");
        $stmt->bindParam(':language', $value, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}

