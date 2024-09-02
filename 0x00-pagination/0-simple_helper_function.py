#!/usr/bin/env python3
'''function returning an index range on start and end indexes
based on the page and page_size'''


def index_range(page: int, page_size: int) -> tuple:
    '''takes two args page and pagesize which are used to determine
    the point at which
    it should start indexing and which to end the indexing'''
    start_index = (page - 1) * page_size
    end_index = start_index + page_size  # page * page_size
    return start_index, end_index
