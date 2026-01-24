-- This is an empty migration.-- 1. 기존에 (기본 파서로) 만들어진 인덱스를 삭제합니다.
DROP INDEX ft_Hospital_search ON Hospital;

-- 2. ngram 파서를 사용하여 인덱스를 다시 만듭니다. (이게 핵심!)
CREATE FULLTEXT INDEX ft_Hospital_search ON Hospital (nameKo) WITH PARSER ngram;