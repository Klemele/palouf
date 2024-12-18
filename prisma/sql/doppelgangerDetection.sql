WITH client_patterns AS (
    SELECT 
        c.id,
        c.first_name, 
        c.last_name, 
        GROUP_CONCAT(hr.year, ':', hr.guidance ORDER BY hr.year) AS pattern
    FROM clients c
    JOIN health_reports hr ON c.id = hr.client_id
    GROUP BY c.id, c.first_name, c.last_name
)
SELECT DISTINCT p1.id
FROM client_patterns p1
JOIN client_patterns p2 ON 
    p1.first_name = p2.first_name AND 
    p1.last_name = p2.last_name AND 
    p1.id != p2.id AND
    (
        p1.pattern LIKE CONCAT('%', p2.pattern, '%') OR 
        p2.pattern LIKE CONCAT('%', p1.pattern, '%')
    )
ORDER BY p1.id;