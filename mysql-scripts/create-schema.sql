

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;


CREATE TABLE `capabilities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `stacks` (
  `id` int(11) NOT NULL,
  `capability_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`capability_id`),
  CONSTRAINT `stack_capability` FOREIGN KEY (`capability_id`) REFERENCES `capabilities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `accesstokens` (
  `token` varchar(256) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `userstacks` (
  `user_id` int(11) NOT NULL,
  `stack_id` int(11) NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`user_id`,`stack_id`),
  KEY `userstack_stack_idx` (`stack_id`),
  CONSTRAINT `userstack_stack` FOREIGN KEY (`stack_id`) REFERENCES `stacks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
