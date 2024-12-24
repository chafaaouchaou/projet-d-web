-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 24 déc. 2024 à 12:16
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `grids`
--

CREATE TABLE `grids` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `niveau_difficulte` enum('débutant','intermédiaire','expert') DEFAULT NULL,
  `nbr_lignes` int(11) NOT NULL,
  `nbr_colonnes` int(11) NOT NULL,
  `def_horizontales` text DEFAULT NULL,
  `def_verticales` text DEFAULT NULL,
  `cases_noire` text NOT NULL,
  `solutions` text NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `date_de_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `grids`
--

INSERT INTO `grids` (`id`, `description`, `nom`, `niveau_difficulte`, `nbr_lignes`, `nbr_colonnes`, `def_horizontales`, `def_verticales`, `cases_noire`, `solutions`, `id_utilisateur`, `date_de_creation`) VALUES
(58, 'test', 'test', 'expert', 10, 10, 'Les outils des astronomes,Louis XIV selon Louis XIV - Chasseur équatorial,Que ce soit le dieu ou le métal il irradie - Sam ou Tom,Porteuse de messages célestes - A une liaison avec Jupiter,Aurochs - Bout de bois,Court - Religieuse,À la mode - Technique utilisée par les virtuoses de l\'imagerie électronique,Petits ensembles battus d\'une tête par celui de Stephan,Local industriel,On les trouve surtout dans le nord de l\'Italie', 'Telle notre bonne vieille planète,Les astronomes sont toujours à sa recherche - Le cadeau d\'Herschel,Brouillent la vision - Odeur méridionale,Pour éviter que le ciel ne nous tombe sur la tête - En Moravie,Article,Boréale,australe ou solaire,Décoreront,Celui du Midi est un haut lieu de l\'astronomie française,Aux quatre coins de la rose - Un gamin vraiment désordonné', '1,4 2,1 2,4 3,7 4,4 4,9 5,3 5,4 6,2 8,5 8,6 8,8 9,1', 'TELESCOPESETAT■ORIONL■RA■UNCLELUMIERE■IOURES■NONNERAS■■NONNEIN■BINNINGQUARTETTESUSINE■■E■OELLOMBARDS', 2, '2024-12-21 13:42:54'),
(66, 'test4', 'test4', 'débutant', 2, 2, 'A,B', 'A,B', '1,1', '■ABC', 2, '2024-12-22 11:59:08');

-- --------------------------------------------------------

--
-- Structure de la table `saved_grids`
--

CREATE TABLE `saved_grids` (
  `id_saved_grids` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_grid` int(11) NOT NULL,
  `solution_partielle` text DEFAULT NULL,
  `save_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `saved_grids`
--

INSERT INTO `saved_grids` (`id_saved_grids`, `id_user`, `id_grid`, `solution_partielle`, `save_date`) VALUES
(4, 2, 58, 'TELESCOPESETAT■ORIONL■RA■UNCLELUMIERE■IOURES■NONNERAS■■NONNEIN■BINNINGQUARTETTESUSINE■■E■OELLOMBARDS', '2024-12-23 14:21:57');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(225) NOT NULL,
  `role` varchar(5) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'Celina8', 'cel@gmail.com', '$2y$10$aa69lW.kVM.bvOkFBCJfW.WzbyW8v0Ls3hE7atvGA8g9M9IC/bc0u', 'user'),
(2, 'user', 'hdh@gmail.com', '$2y$10$ZF4dHaeJ3tb.EVyxQctYvOX/RpPugLalgkAktvo2XJ5VqzL2rAUSm', 'user'),
(3, 'cel', 'fgcl@gmail.com', '$2y$10$IJZ.vMqxCj73/Gea.FeVfOKJRcB3z7nKJ2AhYqL4R8vCloodQJsta', 'user'),
(4, 'admin', 'admin@gmail.com', '$2y$10$iTHUl0mCdz4AuS3MRF1dYO2ow9Ruc3v5Tzf2bCKPIOxx5xd6mxfn.', 'admin'),
(5, 'test', 'test@gmail.com', '$2y$10$3gu3uJcym1XBiDmTKfUCeOP/k.hS61f7zCuFVm4stlb0a1nfEdARK', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `grids`
--
ALTER TABLE `grids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `saved_grids`
--
ALTER TABLE `saved_grids`
  ADD PRIMARY KEY (`id_saved_grids`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_grid` (`id_grid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `grids`
--
ALTER TABLE `grids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `saved_grids`
--
ALTER TABLE `saved_grids`
  MODIFY `id_saved_grids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `grids`
--
ALTER TABLE `grids`
  ADD CONSTRAINT `grids_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `saved_grids`
--
ALTER TABLE `saved_grids`
  ADD CONSTRAINT `saved_grids_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `saved_grids_ibfk_2` FOREIGN KEY (`id_grid`) REFERENCES `grids` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
