-- Add discord_handle column to role_pitches table and make x_handle nullable
ALTER TABLE public.role_pitches 
ADD COLUMN discord_handle TEXT;

-- Make x_handle nullable since now we allow either x_handle or discord_handle
ALTER TABLE public.role_pitches 
ALTER COLUMN x_handle DROP NOT NULL;