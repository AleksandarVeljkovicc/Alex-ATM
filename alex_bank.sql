-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 27, 2025 at 07:22 AM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alex_bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
CREATE TABLE IF NOT EXISTS `card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `card_type_id` int NOT NULL,
  `card_number` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` int NOT NULL,
  `expiration_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `card_number` (`card_number`,`pin`),
  UNIQUE KEY `card_type_id` (`card_type_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `user_id`, `card_type_id`, `card_number`, `pin`, `expiration_date`) VALUES
(1, 1, 6, '6221234567890123', 1234, '2025-12-23'),
(2, 1, 3, '6011123456789010', 4321, '2026-11-10'),
(3, 3, 11, '5100123456789010', 4444, '2025-12-08'),
(4, 5, 1, '9891123456789010', 3333, '2025-12-07'),
(5, 4, 9, '4012345678901234', 1111, '2024-12-02'),
(6, 2, 5, '3528123456789010', 1212, '2026-12-02'),
(7, 6, 2, '4000123456789010', 2222, '2025-11-11');

-- --------------------------------------------------------

--
-- Table structure for table `card_type`
--

DROP TABLE IF EXISTS `card_type`;
CREATE TABLE IF NOT EXISTS `card_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_card_type` (`card_type`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `card_type`
--

INSERT INTO `card_type` (`id`, `card_type`) VALUES
(10, 'American Express'),
(1, 'DinaCard'),
(4, 'Diners Club'),
(3, 'Discover'),
(9, 'Interlink'),
(5, 'JCB'),
(7, 'Maestro'),
(11, 'Mastercard'),
(8, 'RuPay'),
(6, 'UnionPay'),
(2, 'Visa');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
CREATE TABLE IF NOT EXISTS `language` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enter_pin_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `wrong_pin_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_balance_check` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_payment` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_payment_error_balance` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ATM_bill` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_in_progress` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `eject_card_pay` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `eject_card` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `new_transaction` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thank_you_message` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_payment_error_expired` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `submit` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enter_numbers` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wrong_card_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `select_option` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `select_option_error` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_balance` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enter_amount` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pay_previous_page` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enter_card_numbers` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `previous_page` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimum_amount` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `language`, `enter_pin_code`, `wrong_pin_code`, `account_balance_check`, `account_payment`, `account_payment_error_balance`, `ATM_bill`, `transaction_in_progress`, `eject_card_pay`, `eject_card`, `new_transaction`, `thank_you_message`, `account_payment_error_expired`, `submit`, `delete_`, `enter_numbers`, `wrong_card_number`, `select_option`, `select_option_error`, `account_balance`, `enter_amount`, `pay_previous_page`, `enter_card_numbers`, `previous_page`, `minimum_amount`) VALUES
(1, 'Serbian', 'Molimo Vas da unesete pin kod', 'Pogresan pin kod, pokusajte ponovo', 'Provera stanja na racunu', 'Isplata sa racuna', 'Nemate dovoljno novca na racunu', 'Zelite li racun?', 'Transakcija je u toku, molimo Vas da sacekate', 'Izbaci karticu i isplati', 'Izbaci karticu', 'Nova transakcija', 'Hvala Vam sto koristite bankomat Alex banke', 'Rok vase kartice je istekao', 'Nastavi', 'Obrisi', 'Unesite brojeve', 'Pogresan broj kartice, pokusajte ponovo', 'Izaberite opciju', 'Niste izabrali opciju', 'Vase stanje na racunu je', 'Molimo Vas da unesete sumu', 'Isplati i vrati na prethodnu stranicu', 'Molimo Vas da unesete broj kartice', 'Prethodna stranica', 'Minimalna suma novca je 2 €'),
(2, 'English', 'Please enter your pin code', 'Wrong pin code, try again', 'Checking the balance on the account', 'Payment from the account', 'You don\'t have enough money in your account', 'Would you like an invoice?', 'The transaction is in progress, please wait', 'Take out the card and pay', 'Eject the card', 'New transaction', 'Thank you for using the ATM of Alex Bank', 'Your card has expired', 'Continue', 'Delete', 'Enter numbers', 'Wrong card number, try again', 'Select an option', 'You have not selected an option', 'Your account balance is', 'Please enter the amount', 'Pay and return to previous page', 'Please enter the card number', 'Previous page', 'The minimum amount of money is 2 €'),
(3, 'German', 'Bitte geben Sie Ihren PIN-Code ein', 'Falscher PIN-Code, versuchen Sie es erneut', 'Überprüfung des Kontostands', 'Zahlung vom Konto', 'Sie haben nicht genug Geld auf Ihrem Konto', 'Wünschen Sie eine Rechnung?', 'Die Transaktion läuft, bitte warten', 'Karte herausnehmen und bezahlen', 'Werfen Sie die Karte aus', 'Neue Transaktion', 'Vielen Dank, dass Sie den Geldautomaten der Alex Bank nutzen', 'Ihre Karte ist abgelaufen', 'Weitermachen', 'Löschen', 'Geben Sie Zahlen ein', 'Falsche Kartennummer, versuchen Sie es erneut', 'Wählen Sie eine Option', 'Sie haben keine Option ausgewählt', 'Ihr Kontostand beträgt', 'Bitte geben Sie den Betrag ein', 'Bezahlen und zur vorherigen Seite zurückkehren', 'Bitte geben Sie die Kartennummer ein', 'Vorherige Seite', 'Der Mindestbetrag beträgt 2 €'),
(4, 'French', 'Veuillez entrer votre code PIN', 'Mauvais code PIN, réessayez', 'Vérifier le solde du compte', 'Paiement depuis le compte', 'Vous n\'avez pas assez d\'argent sur votre compte', 'Souhaitez-vous une facture?', 'La transaction est en cours, veuillez patienter', 'Sortez la carte et payez', 'Éjectez la carte', 'Nouvelle transaction', 'Merci d\'utiliser le guichet automatique d\'Alex Bank', 'Votre carte a expiré', 'Continuer', 'Supprimer', 'Entrez des chiffres', 'Mauvais numéro de carte, réessayez', 'Sélectionnez une option', 'Vous n\'avez sélectionné aucune option', 'Le solde de votre compte est ', 'Veuillez saisir le montant', 'Payer et revenir à la page précédente', 'Veuillez saisir le numéro de la carte', 'Page précédente', 'Le montant minimum est de 2 €');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_balance` decimal(10,0) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_number` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_number` (`account_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `lastname`, `account_balance`, `created_at`, `account_number`) VALUES
(1, 'Aleksandar', 'Veljkovic', '2034', '2024-12-27 19:54:14', '2796758023718868984544'),
(2, 'Filip', 'Visnjic', '1246', '2024-12-27 19:55:11', '5371331660961176039978'),
(3, 'John', 'Wick', '1560013', '2024-12-27 19:56:28', '2263343341801519310198'),
(4, 'Aleksandra', 'Jovanovic', '350', '2024-12-27 19:58:25', '0501606590299653189509'),
(5, 'Tamara', 'Brankovic', '0', '2024-12-27 19:59:04', '2888424309236198178474'),
(6, 'Nemanja', 'Kurbla', '210001', '2024-12-27 20:00:59', '2888424309236198178485');

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_card_view`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `user_card_view`;
CREATE TABLE IF NOT EXISTS `user_card_view` (
`full_name` varchar(41)
,`account_balance` decimal(10,0)
,`account_number` varchar(40)
,`card_number` varchar(40)
,`pin` int
,`expiration_date` date
,`card_type` varchar(100)
);

-- --------------------------------------------------------

--
-- Structure for view `user_card_view`
--
DROP TABLE IF EXISTS `user_card_view`;

DROP VIEW IF EXISTS `user_card_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_card_view`  AS SELECT concat(`u`.`name`,' ',`u`.`lastname`) AS `full_name`, `u`.`account_balance` AS `account_balance`, `u`.`account_number` AS `account_number`, `c`.`card_number` AS `card_number`, `c`.`pin` AS `pin`, `c`.`expiration_date` AS `expiration_date`, `ct`.`card_type` AS `card_type` FROM ((`user` `u` join `card` `c` on((`u`.`id` = `c`.`user_id`))) join `card_type` `ct` on((`c`.`card_type_id` = `ct`.`id`)))  ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`card_type_id`) REFERENCES `card_type` (`id`),
  ADD CONSTRAINT `card_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
