CREATE DATABASE IF NOT EXISTS hanaropass;

CREATE DATABASE IF NOT EXISTS hanaropass_shadow;

GRANT ALL PRIVILEGES ON hanaropass.* TO 'hanaropass_dev'@'%';
GRANT ALL PRIVILEGES ON hanaropass_shadow.* TO 'hanaropass_dev'@'%';
FLUSH PRIVILEGES;