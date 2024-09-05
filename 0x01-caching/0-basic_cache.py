#!/usr/bin/env python3
'''a class that is a caching system and inherits from parent class'''


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    '''a basic cache class that inherits from basic caching'''
    def __init__(self):
        '''initializing class inheriting a dict from parent class'''
        super().__init__()
        self.cache_data = {}

    def put(self, key, item):
        '''assign to the dict the item value for the key key'''
        if key is None or item is None:
            '''do nothing'''
            return
        self.cache_data[key] = item

    def get(self, key):
        '''return the value in cache_data linked to the key'''
        if key is None or not key:
            '''if key doesnt exist or is none'''
            return None
        return self.cache_data.get(key)
