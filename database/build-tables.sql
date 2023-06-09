CREATE TYPE public.account_type AS ENUM ('Client', 'Employee', 'Admin');

ALTER TYPE public.account_type OWNER TO kendrabry;

CREATE TABLE public.classification (
	classification_id INT GENERATED BY DEFAULT AS IDENTITY,
	classification_name CHARACTER VARYING NOT NULL,
	CONSTRAINT classification_pk PRIMARY KEY (classification_id)
);

CREATE TABLE IF NOT EXISTS public.inventory (
	inv_id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	inv_make CHARACTER VARYING NOT NULL,
	inv_model CHARACTER VARYING NOT NULL,
	inv_year CHARACTER(4) NOT NULL,
	inv_description TEXT NOT NULL,
	inv_image CHARACTER VARYING NOT NULL,
	inv_thumbnail CHARACTER VARYING NOT NULL,
	inv_price NUMERIC(9, 0) NOT NULL,
	inv_miles INTEGER NOT NULL,
	inv_color CHARACTER VARYING NOT NULL,
	classification_id INTEGER NOT NULL,
	CONSTRAINT inventory_pkey PRIMARY KEY (inv_id)
);

ALTER TABLE IF EXISTS public.inventory
	ADD CONSTRAINT fk_classification FOREIGN KEY (classification_id)
	REFERENCES public.classification (classification_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

CREATE TABLE IF NOT EXISTS public.account
(
    account_id INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    account_firstname CHARACTER VARYING NOT NULL,
    account_lastname CHARACTER VARYING NOT NULL,
    account_email CHARACTER VARYING NOT NULL,
    account_password CHARACTER VARYING NOT NULL,
    account_type account_type NOT NULL DEFAULT 'Client'::account_type,
    CONSTRAINT account_pkey PRIMARY KEY (account_id)
);

INSERT INTO public.classification (classification_name)
VALUES ('Custom'),
	('Sport'),
	('SUV'),
	('Truck'),
	('Sedan');

INSERT INTO public.inventory (
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )
VALUES   (
    'Chevy',
    'Camaro',
    '2018',
    'If you want to look cool this is the ar you need! This car has great performance at an affordable price. Own it today!',
    '/images/camaro.jpg',
    '/images/camaro-tn.jpg',
    25000,
    101222,
    'Silver',
    2
  ), (
    'Batmobile',
    'Custom',
    '2007',
    'Ever want to be a super hero? now you can with the batmobile. This car allows you to switch to bike mode allowing you to easily maneuver through trafic during rush hour.',
    '/images/batmobile.jpg',
    '/images/batmobile-tn.jpg',
    65000,
    29887,
    'Black',
    1
  ), (
    'FBI',
    'Surveillance Van',
    '2016',
    'do you like police shows? You will feel right at home driving this van, come complete with survalence equipments for AND extra fee of $2,000 a month. ',
    '/images/survan.jpg',
    '/images/survan-tn.jpg',
    20000,
    19851,
    'Green',
    1
  ), (
    'Dog ',
    'Car',
    '1997',
    'Do you like dogs? Well this car is for you straight from the 90s from Aspen, Colorado we have the orginal Dog Car complete with fluffy ears.',
    '/images/dog-car.jpg',
    '/images/dog-car-tn.jpg',
    35000,
    71632,
    'Brown',
    1
  ), (
    'Jeep',
    'Wrangler',
    '2019',
    'The Jeep Wrangler is small AND compact with enough power to get you WHERE you want to go. Its great for everyday driving as well as off-roading whether that be on the the rocks or in the mud!',
    '/images/wrangler.jpg',
    '/images/wrangler-tn.jpg',
    28045,
    41205,
    'Orange',
    3
  ), (
    'Lamborghini',
    'Adventador',
    '2016',
    'This V-12 engine packs a punch in this sporty car. Make sure you wear your seatbelt AND obey all traffic laws. ',
    '/images/adventador.jpg',
    '/images/adventador-tn.jpg',
    417650,
    71003,
    'Blue',
    2
  ), (
    'Aerocar International',
    'Aerocar',
    '1963',
    'Are you sick of rushhour trafic? This car converts into an airplane to get you WHERE you are going fast. Only 6 of these were made, get them while they last!',
    '/images/aerocar.jpg',
    '/images/aerocar-tn.jpg',
    700000,
    18956,
    'Red',
    1
  ), (
    'Monster',
    'Truck',
    '1995',
    'Most trucks are for working, this one is for fun. This beast comes with 60 inch tires giving you traction needed to jump AND roll in the mud.',
    '/images/monster-truck.jpg',
    '/images/monster-truck-tn.jpg',
    150000,
    3998,
    'purple',
    1
  ), (
    'Cadillac',
    'Escalade',
    '2019',
    'This stylin car is great for any occasion from going to the beach to meeting the president. The luxurious inside makes this car a home away from home.',
    '/images/escalade.jpg',
    '/images/escalade-tn.jpg',
    75195,
    41958,
    'Black',
    4
  ), (
    'GM',
    'Hummer',
    '2016',
    'Do you have 6 kids AND like to go offroading? The Hummer gives you the small interiors with an engine to get you out of any muddy or rocky situation.',
    '/images/hummer.jpg',
    '/images/hummer-tn.jpg',
    58800,
    56564,
    'Yellow',
    4
  ), (
    'Mechanic',
    'Special',
    '1964',
    'Not sure WHERE this car came from. however with a little tlc it will run as good a new.',
    '/images/mechanic.jpg',
    '/images/mechanic-tn.jpg',
    100,
    200125,
    'Rust',
    5
  ), (
    'Ford',
    'Model T',
    '1921',
    'The Ford Model T can be a bit tricky to drive. It was the first car to be put into production. You can get it in any color you want as long as it is black.',
    '/images/model-t.jpg',
    '/images/model-t-tn.jpg',
    30000,
    26357,
    'Black',
    5
  ), (
    'Mystery',
    'Machine',
    '1999',
    'Scooby AND the gang always found luck in solving their mysteries because of there 4 wheel drive Mystery Machine. This Van will help you do whatever job you are required to with a success rate of 100%.',
    '/images/mystery-van.jpg',
    '/images/mystery-van-tn.jpg',
    10000,
    128564,
    'Green',
    1
  ),
  (
    'Spartan',
    'Fire Truck',
    '2012',
    'Emergencies happen often. Be prepared with this Spartan fire truck. Comes complete with 1000 ft. of hose AND a 1000 gallon tank.',
    '/images/fire-truck.jpg',
    '/images/fire-truck-tn.jpg',
    50000,
    38522,
    'Red',
    4
  ), (
    'Ford',
    'Crown Victoria',
    '2013',
    'After the police force UPDATEd their fleet these cars are now available to the public! These cars come equiped with the siren which is convenient for college students running late to class.',
    '/images/crwn-vic.jpg',
    '/images/crwn-vic-tn.jpg',
    10000,
    108247,
    'White',
    5
  );

INSERT INTO public.account (
	account_firstname,
	account_lastname,
	account_email,
	account_password
)
VALUES (
	'Tony',
	'Stark',
	'tony@starknet.com',
	'Iam1ronM@an'
);

UPDATE public.account
SET account_type = 'Admin'::account_type
WHERE account_id = 1;

DELETE FROM public.account
WHERE account_firstname = 'Tony'
AND account_lastname = 'Stark';

UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_make = 'GM'
AND inv_model = 'Hummer';

SELECT public.inventory.inv_make, public.inventory.inv_model, public.classification.classification_name
FROM public.classification
INNER JOIN public.inventory
ON public.classification.classification_id = public.inventory.classification_id
WHERE public.classification.classification_name = 'Sport';

UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'), inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');

CREATE TABLE public.review (
	review_id INT GENERATED BY DEFAULT AS IDENTITY,
	review_rating INTEGER NOT NULL,
	review_name CHARACTER VARYING NOT NULL,
	review_content TEXT NOT NULL,
	inv_id INTEGER not null,
	CONSTRAINT review_id PRIMARY KEY (review_id)
);


INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Jennifer Adams', 'I recently purchased the Chevy Camaro and I must say it''s been a blast to drive! The sleek design and powerful engine make it a joy on the road. The handling is smooth, and the interior is comfortable. It''s the perfect car for both city commutes and weekend getaways.', 1);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Michael Thompson', 'I have mixed feelings about the Batmobile. While the exterior design is impressive, the performance leaves something to be desired. The acceleration is a bit sluggish, and the fuel efficiency could be better. On the positive side, the spacious interior and advanced safety features are notable.', 2);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Emily Rodriguez', 'The FBI Surveillance Van is a dream come true! From the moment I sat in the driver''s seat, I knew I made the right choice. The engine is incredibly powerful, and the handling is precise. The luxurious interior and cutting-edge technology add to the overall experience. I couldn''t be happier.', 3);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'Daniel Walker', 'I had high hopes for the Dog Car, but it fell short of expectations. The build quality is subpar, and the engine lacks power. The interior is cramped, and the seats are uncomfortable for long drives. It''s an average car at best and doesn''t justify its price tag.', 4);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Olivia Thompson', 'The Jeep Wrangler is a reliable and practical car. It offers a smooth ride, good fuel efficiency, and ample storage space. The sleek exterior design is a bonus, and the comfortable interior makes long trips enjoyable. It''s a solid choice for anyone looking for a dependable vehicle.', 5);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Ethan Lewis', 'The Lamborghini Adventador is a beast on wheels! The raw power of the engine is exhilarating, and the acceleration is lightning-fast. The sporty design and premium features make it stand out from the crowd. This car is not for the faint-hearted, but for those who crave excitement and performance.', 6);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Lily Patel', 'The Aerocar International Aerocar is a decent car for daily commuting. It offers good fuel efficiency and a compact size that makes parking a breeze. However, the engine lacks punch, and the interior feels a bit dated. If you''re looking for a simple and affordable option, it gets the job done.', 7);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (1, 'Benjamin Carter', 'I regret purchasing the Monster Truck. The engine constantly overheats, and the handling is unpredictable. The interior is cramped, and the seats are uncomfortable. It''s a nightmare to drive this car, and I would strongly advise against anyone considering buying it.', 8);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Sophia Turner', 'The Cadillac Escalade is a stylish and practical car. It offers a comfortable ride, spacious cabin, and a user-friendly infotainment system. The fuel efficiency is commendable, and the safety features provide peace of mind. It''s a reliable choice for families and daily commuters.', 9);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Noah Martinez', 'I''m in love with the GM Hummer! The sleek design, luxurious interior, and powerful engine make it a true gem. It''s a head-turner on the road, and the advanced technology enhances the driving experience. If you''re looking for the perfect blend of elegance and performance, this is it!', 10);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Jacob Wilson', 'I recently purchased the Mechanic Special and it exceeded my expectations. The powerful engine provides an exhilarating driving experience, and the handling is precise. The sleek design turns heads wherever I go. I highly recommend this car to any speed enthusiast.', 11);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'Emma Davis', 'I had high hopes for the Ford Model T, but it fell short in terms of performance and comfort. The engine lacks power, and the seats are not comfortable for long journeys. On the positive side, it offers good fuel efficiency and decent cargo space.', 12);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Alexander Johnson', 'The Mystery Machine is a true beast on the road. The powerful engine delivers lightning-fast acceleration, and the aggressive design makes a bold statement. The interior is luxurious, and the advanced tech features are impressive. This car is a dream come true.', 13);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Olivia Anderson', 'The Spartan Fire Truck is a decent choice for urban driving. It offers good maneuverability and parking ease. However, the engine lacks power for highway driving, and the cabin can feel cramped. It''s an average car for city dwellers.', 14);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'William Clark', 'I recently purchased the Ford Crown Victoria and it''s been a fantastic experience so far. The rugged exterior design suits my adventurous lifestyle, and the off-road capabilities are impressive. The interior is comfortable, and the technology features are up to date.', 15);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (1, 'Sophia Hernandez', 'I had a terrible experience with the Chevy Camaro. The engine performance is extremely poor, and it constantly breaks down. The interior quality is subpar, and the seats are uncomfortable. Avoid this car at all costs.', 1);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Aiden Thompson', 'The Batmobile is a masterpiece of engineering. The powerful engine delivers unmatched performance, and the luxurious interior pampers the driver and passengers. The cutting-edge technology and sleek design make it a true head-turner.', 2);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Charlotte Lewis', 'The FBI Surveillance Van is a reliable car for daily commuting. It offers good fuel efficiency and comfortable seating. However, the engine lacks power for quick overtaking, and the interior design feels dated. It''s a practical choice for everyday use.', 3);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'James Martin', 'I''m impressed with the Dog Car. The smooth ride, excellent fuel efficiency, and spacious interior make it a comfortable choice for long drives. The exterior design is modern and eye-catching. Overall, a great value for money.', 4);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Ella Wilson', 'The Jeep Wrangler is a family-friendly car with ample space for passengers and cargo. The ride quality is comfortable, and the safety features are top-notch. The fuel efficiency is impressive for its size. Highly recommended for families on the go.', 5);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'David Martinez', 'I had high expectations for the Lamborghini Adventador, but it failed to deliver. The engine lacks power, and the handling is subpar. The interior design feels outdated, and the seats are not comfortable for long journeys.', 6);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Grace Johnson', 'The Aerocar International Aerocar is a reliable and stylish car. The performance is solid, and the handling is smooth. The interior offers a comfortable and spacious cabin. The tech features are intuitive and enhance the driving experience.', 7);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Henry Adams', 'The Monster Truck is an affordable car with good fuel efficiency. The exterior design is basic, and the engine performance is average. The interior lacks some modern features, but it gets the job done for daily commuting.', 8);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Chloe Thompson', 'I''m in love with the Cadillac Escalade! The luxurious features and comfortable seating make every drive a pleasure. The powerful engine and smooth ride add to the overall experience. It''s a car fit for royalty.', 9);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'Jackson Miller', 'The GM Hummer is a budget-friendly car, but it comes with compromises. The engine lacks power, and the interior feels cheaply made. The fuel efficiency is decent, but there are better options in the market.', 10);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Ava Garcia', 'The Mechanic Special is a sporty car that delivers a thrilling driving experience. The powerful engine and responsive handling make it fun to drive. The interior is comfortable, and the tech features are impressive.', 11);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (1, 'Mason Davis', 'The Ford Model T was a disappointment. The engine constantly stalled, and the handling was unreliable. The interior lacked comfort and modern features. Stay away from this car.', 12);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Harper Wilson', 'The Mystery Machine is a premium car that lives up to its name. The elegant design, luxurious interior, and powerful engine make it a joy to drive. The advanced tech features are a nice addition.', 13);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Liam Anderson', 'The Spartan Fire Truck is a decent car for city driving. It offers good maneuverability and fuel efficiency. However, the engine lacks power for highway driving, and the interior design feels dated.', 14);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Lucas Hernandez', 'The Ford Crown Victoria is a powerful and stylish car. The engine performance is exceptional, and the handling is precise. The interior is comfortable and well-designed. A great choice for those seeking both performance and luxury.', 15);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'Mia Adams', 'I was disappointed with the Chevy Camaro. The engine had constant issues, and the handling was unpredictable. The interior lacked comfort and modern features. Not recommended.', 1);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Noah Johnson', 'The Batmobile is a dream car for speed enthusiasts. The engine power is mind-blowing, and the acceleration is lightning-fast. The sleek design and aerodynamics add to the overall performance. It''s an exhilarating driving experience.', 2);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Sophia Clark', 'The FBI Surveillance Van is an average car for daily commuting. It offers decent fuel efficiency and a comfortable ride. However, the interior design feels outdated, and the engine lacks power for quick overtaking.', 3);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Liam Rodriguez', 'The Dog Car is a sporty and fun-to-drive car. The powerful engine delivers excellent performance, and the handling is sharp. The interior offers a comfortable and modern cabin. Highly recommended for driving enthusiasts.', 4);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (1, 'Olivia Adams', 'I had a terrible experience with the Jeep Wrangler. The engine constantly malfunctioned, and the car was in the repair shop more often than on the road. The interior quality was poor, and the seats were uncomfortable. Avoid at all costs.', 5);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Ethan Wilson', 'The Lamborghini Adventador is the epitome of luxury and elegance. The refined exterior design and opulent interior make it a standout. The smooth ride and advanced tech features elevate the driving experience to a whole new level.', 6);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Isabella Miller', 'The Aerocar International Aerocar is a practical and affordable car for daily use. It offers good fuel efficiency and maneuverability. However, the interior design lacks style, and the engine power is average.', 7);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Mason Garcia', 'The Monster Truck is a capable off-road vehicle. The rugged design and powerful engine make it suitable for any adventure. The interior is comfortable, and the cargo space is ample.', 8);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Ava Martinez', 'The Cadillac Escalade is a luxury car that delivers a top-notch driving experience. The powerful engine, smooth ride, and exquisite interior make it a true masterpiece. The attention to detail is remarkable.', 9);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'Jackson Brown', 'I had high expectations for the GM Hummer, but it was a disappointment. The engine performance is lackluster, and the handling feels unresponsive. The interior design is dated, and the seats are uncomfortable.', 10);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Emily Thompson', 'The Mechanic Special is a reliable and practical car for daily commuting. It offers good fuel efficiency and a comfortable ride. The exterior design is modern and sleek, and the interior provides ample space.', 11);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (1, 'Lucas Davis', 'The Ford Model T lives up to its name. The engine performance is abysmal, and the car constantly breaks down. The interior quality is poor, and the seats are uncomfortable. A complete disaster.', 12);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Harper Wilson', 'The Mystery Machine is a true masterpiece of engineering. The powerful engine, precise handling, and luxurious interior make it a joy to drive. It''s a car that turns heads wherever it goes.', 13);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Liam Rodriguez', 'The Spartan Fire Truck is an average car for daily commuting. It offers decent fuel efficiency and a comfortable ride. However, the interior design lacks style, and the engine power is average.', 14);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Isabella Thompson', 'The Ford Crown Victoria is a reliable and practical car. It offers good fuel efficiency and a comfortable ride. The exterior design is sleek, and the interior provides ample space for passengers and cargo.', 15);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (2, 'Mason Garcia', 'The Chevy Camaro is an underwhelming car. The engine lacks power, and the handling feels sluggish. The interior design is basic, and the seats are not comfortable for long drives.', 1);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (5, 'Ava Martinez', 'The Batmobile is a true gem. The powerful engine, sleek design, and luxurious interior make it a standout choice. The advanced tech features add convenience and enhance the driving experience.', 2);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (3, 'Jackson Brown', 'The FBI Surveillance Van is a decent car for city driving. It offers good maneuverability and fuel efficiency. However, the engine lacks power for highway driving, and the interior design feels dated.', 3);

INSERT INTO public.review (review_rating, review_name, review_content, inv_id)
VALUES (4, 'Emily Thompson', 'The Dog Car is a reliable and stylish car. The performance is solid, and the handling is smooth. The interior offers a comfortable and modern cabin. The tech features are intuitive and enhance the driving experience.', 4);