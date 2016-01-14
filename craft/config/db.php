<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */
$customDbConfig = array(
  '*' => array(
  		// Use the same prefix in all environments
  		'tablePrefix' 	=> 'craft',
  		// Live database info
  		'server' 		=> 'mysql',
		'user' 			=> 'root',
		'password' 		=> 'secret',
		'database' 		=> 'project'
  ),
  // Dev database info
	'staging.' => array(
  		'server' 		=> 'mysql',
		'user' 			=> 'root',
		'password' 		=> 'secret',
		'database' 		=> 'project'
  )
);
// If a local db file exists, merge the local db settings
if (is_array($customLocalDbConfig = @include(CRAFT_CONFIG_PATH . 'local/db.php')))
{
	$customGlobalDbConfig = array_merge($customDbConfig['*'], $customLocalDbConfig);
  $customDbConfig['*'] = $customGlobalDbConfig;
}
return $customDbConfig;
