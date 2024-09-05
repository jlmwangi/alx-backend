#!/usr/bin/env python3
'''a caching system mrucache that inherits from Base Caching'''


from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    '''a least recently used caching system'''
    def __init__(self):
        '''initialize lru cache'''
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        '''put items in a dict and discard mru item'''
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data.move_to_end(key)  # update item marking it as used
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            '''discard least recently used item'''
            oldest_item = next(reversed(self.cache_data))
            del self.cache_data[oldest_item]
            print(f"DISCARD: {oldest_item}")

        self.cache_data[key] = item

    def get(self, key):
        '''return value linked to key'''
        if key is None:
            return None
        if key in self.cache_data:  # move item to end to mark it recent used
            self.cache_data.move_to_end(key)
            return self.cache_data.get(key)
        return None
