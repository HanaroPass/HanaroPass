DROP INDEX ft_Hospital_search ON Hospital;

CREATE FULLTEXT INDEX ft_Hospital_search ON Hospital (nameKo) WITH PARSER ngram;