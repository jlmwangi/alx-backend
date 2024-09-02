#!/usr/bin/env python3
'''function that returns appropriate page of the dataset'''


import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def index_range(self, page: int, page_size: int) -> tuple:
        '''helper method to calcaulate starting and ending indexes'''
        start_index = (page - 1) * page_size
        end_index = page * page_size  # start_index + page_size
        return start_index, end_index

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''return appropriate page or correct list of rows'''
        assert isinstance(page, int)
        assert isinstance(page_size, int)

        assert page > 0
        assert page_size > 0

        data = self.dataset()  # load dataset
        start_index, end_index = self.index_range(page, page_size)

        if start_index >= len(data) or start_index < 0:  # check out of range
            return []

        return data[start_index:end_index]
