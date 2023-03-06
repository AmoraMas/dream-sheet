# Notes

I need to add the following contraints in
I couldn't add at table creation due to asynchronous code.

- accounts
    - location_id integer NOT NULL REFERENCES location,

- places
    - location_id INTEGER NOT NULL REFERENCES location,
    - climate_id INTEGER REFERENCES climate,
    - population_id INTEGER REFERENCES population,
    - type_id INTEGER REFERENCES type,

- dreams
    - account_id INTEGER NOT NULL REFERENCES accounts,
    - place_id INTEGER NOT NULL REFERENCES places,

- visits
    - dream_id INTEGER NOT NULL REFERENCES dreams,