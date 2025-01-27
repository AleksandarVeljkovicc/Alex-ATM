<?php

namespace Tests\Unit\Model;

use PHPUnit\Framework\TestCase;
use Src\Model\Language;
use Src\Config\Database;

class LanguageSQLiteIntegrationTest extends TestCase
{
    private $db;

    protected function setUp(): void
    {
        $this->db = new \PDO('sqlite::memory:'); 

        $this->createDatabaseSchema();

        $ref = new \ReflectionClass(Database::class);
        $property = $ref->getProperty('connection');
        $property->setAccessible(true);
        $property->setValue(null, $this->db); 
    }

    private function createDatabaseSchema()
    {
        $query = "CREATE TABLE language (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            language TEXT NOT NULL
        )";
        $this->db->exec($query);

        $this->db->exec("INSERT INTO language (language) VALUES ('English')");
        $this->db->exec("INSERT INTO language (language) VALUES ('Serbian')");
    }

    public function testGetLanguageTable()
    {
        $languageModel = new Language();
        $languages = $languageModel->getLanguageTable();

        $this->assertCount(2, $languages);
        $this->assertEquals('English', $languages[0]['language']);
        $this->assertEquals('Serbian', $languages[1]['language']);
    }

    public function testGetLanguageByValue()
    {
        $languageModel = new Language();

        $language = $languageModel->getLanguageByValue('English');
        $this->assertNotEmpty($language);
        $this->assertEquals('English', $language['language']);

        $language = $languageModel->getLanguageByValue('German');
        $this->assertEmpty($language);
    }
    protected function tearDown(): void
    {
        $this->db = null;
    }
}