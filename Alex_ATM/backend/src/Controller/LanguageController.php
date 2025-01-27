<?php
namespace Src\Controller;

use Src\Model\Language;

class LanguageController
{
        private $langModel;

        public function __construct()
        {
            $this->langModel = new Language();
        }

        public function getLanguages()
        {
            $languages = $this->langModel->getLanguageTable();
            header('Content-Type: application/json');
            echo json_encode($languages);
        }


        public function getLanguageByValue($value)      
    {
        $language = $this->langModel->getLanguageByValue($value);
        if ($language) {
            header('Content-Type: application/json');
            echo json_encode($language);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Language not found']);
        }
    }

}
