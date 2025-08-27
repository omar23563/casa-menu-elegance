-- Fix RLS policies for categories and dishes tables
-- Remove all existing conflicting policies and create proper security controls

-- Drop all existing problematic policies on categories table
DROP POLICY IF EXISTS "Allow all operations on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow only authenticated users to modify categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read on categories" ON public.categories;

-- Drop all existing problematic policies on dishes table  
DROP POLICY IF EXISTS "Allow all operations on dishes" ON public.dishes;
DROP POLICY IF EXISTS "Allow only authenticated users to modify dishes" ON public.dishes;
DROP POLICY IF EXISTS "Allow public read on dishes" ON public.dishes;

-- Create proper RLS policies for categories table
-- Allow public read access for menu viewing
CREATE POLICY "Public can view categories" 
ON public.categories 
FOR SELECT 
USING (true);

-- Only authenticated users can modify categories (restaurant staff)
CREATE POLICY "Authenticated users can manage categories" 
ON public.categories 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Create proper RLS policies for dishes table
-- Allow public read access for menu viewing
CREATE POLICY "Public can view dishes" 
ON public.dishes 
FOR SELECT 
USING (true);

-- Only authenticated users can modify dishes (restaurant staff)
CREATE POLICY "Authenticated users can manage dishes" 
ON public.dishes 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Ensure RLS is enabled on both tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;