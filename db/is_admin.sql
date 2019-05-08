SELECT cookie_users.username , cookie_users.email , cookie_users.password  
FROM cookie_users
INNER JOIN cookie_admins ON cookie_users.users_id = cookie_admins.users_id;