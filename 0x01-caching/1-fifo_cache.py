#!/usr/bin/env python3
'''class fifocache inheriting from basecaching'''


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    '''a first in first out caching system'''
    def __init__(self):
        '''initialize the fifo class'''
        super().__init__()
        self.cache_data = {}

    def put(self, key, item):
        '''assign item value for the key to the dict'''
        if key is None or item is None:
            return
        else:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                '''if no of items is greater than max items'''
                first_key = next(iter(self.cache_data))  # get first key
                del self.cache_data[first_key]
                print(f"DISCARD: {first_key}")
           
    def get(self, key):
        '''returns value associated with key'''
        if key is None or not key:
            return None
        return self.cache_data.get(key)
