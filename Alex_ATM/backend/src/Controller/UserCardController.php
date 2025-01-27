<?php
namespace Src\Controller;

use Src\Model\UserCard;

class UserCardController
{
    private $cardModel;

    public function __construct()
    {
        $this->cardModel = new UserCard();
    }

    public function checkCard($cardNumber)
    {
        $card = $this->cardModel->getCardByNumber($cardNumber);

        if ($card) {
            echo json_encode(['success' => true, 'card' => $card]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Card not found']);
        }
        exit; 
    }

    public function updateAccountBalance($fullName, $newBalance)
    {
        $updated = $this->cardModel->updateAccountBalance($fullName, $newBalance);

        if ($updated) {
            echo json_encode(['success' => true, 'message' => 'Account balance updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to update account balance']);
        }
        exit; 
    }
}
?>