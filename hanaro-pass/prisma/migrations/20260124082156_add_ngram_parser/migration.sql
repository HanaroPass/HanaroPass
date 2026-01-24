-- This is an empty migration.
CREATE FULLTEXT INDEX `ft_Hospital_name` ON `Hospital`(`nameKo`) WITH PARSER ngram;