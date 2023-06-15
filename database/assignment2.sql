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
