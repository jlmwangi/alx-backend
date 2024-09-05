#!/usr/bin/env python3
'''class lifocache inheriting from basecaching'''


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    '''a last in first out caching system'''
    def __init__(self):
        '''initialize the lifo class'''
        super().__init__()

    def put(self, key, item):
        '''assign item value for the key to the dict'''
        if key is None or item is None:
            return
        else:
            #  self.cache_data[key] = item
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                '''if no of items is greater than max items'''
                last_key = next(reversed(self.cache_data))  # get last key
                del self.cache_data[last_key]
                print(f"DISCARD: {last_key}")
            self.cache_data[key] = item

    def get(self, key):
        '''returns value associated with key'''
        if key is None:
            return None
        return self.cache_data.get(key)
