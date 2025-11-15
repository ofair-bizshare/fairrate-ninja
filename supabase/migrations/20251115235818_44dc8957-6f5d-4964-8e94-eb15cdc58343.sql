-- שלב 1: מחיקת כל הדירוגים הקיימים
DELETE FROM professional_ratings;

-- שלב 2: מחיקת העמודה rating_overall
ALTER TABLE professional_ratings
DROP COLUMN rating_overall;