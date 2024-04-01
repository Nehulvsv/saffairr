import React from "react";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Mycoins() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen w-full flex justify-center items-start mt-2 ">
      <div className=" rounded-lg sm:p-3  w-3/4 h-3/4 p-1 ">
        <h2 className="text-5xl font-bold mb-4 text-center">Your Rewards</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="h-44 w-44 flex items-center justify-center mr-2">
            <img src="../assets/coin.png" alt="Coin" />
          </div>
          <div className="font-bold text-5xl">
            <span> {currentUser.coins}</span> coins
          </div>
        </div>
        {/* <div className="sm:flex flex-cols gap-3 justify-center items-center w-full bg-red-200 flex md:bg-blue-300 sm:bg-yellow-500  sm:flex"> */}
        <div className="cointables  gap-3 justify-center items-center w-full ">
          <div className="overflow-x-auto   mb-3 border border-black-200 border-1">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {'Apple MacBook Pro 17"'}
                  </Table.Cell>
                  <Table.Cell>Sliver</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                  </Table.Cell>
                  <Table.Cell>White</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Magic Mouse 2
                  </Table.Cell>
                  <Table.Cell>Black</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                  </Table.Cell>
                  <Table.Cell>White</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
