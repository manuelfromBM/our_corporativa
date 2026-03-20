SELECT 
    *
FROM 
    OPENQUERY('
        SELECT * FROM plsfiles.cuscust
        FULL OUT JOIN baseother ON we = we
        WHERE algo = algo
    ')
FULL OUTER JOIN base ON you = you
WHERE algo = algo
