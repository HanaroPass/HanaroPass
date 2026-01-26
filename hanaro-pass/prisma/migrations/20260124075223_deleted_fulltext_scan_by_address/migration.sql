-- DropIndex
DROP INDEX `ft_Hospital_search` ON `Hospital`;

-- CreateIndex
CREATE FULLTEXT INDEX `ft_Hospital_search` ON `Hospital`(`nameKo`);
