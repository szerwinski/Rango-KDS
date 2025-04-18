import { FB, FlexButton, SD, SectionWrapper, Spacer } from "../components/base";
import { H1, H2, P1, P2 } from "../components/typography";
import Image from "next/image";
import useWindowInfo from "../hooks/useWindowInfo";
import { useState } from "react";
import classNames from "classnames";
import { Restaurant } from "../model";
import axios, { Canceler } from "axios";
import Button from "../components/buttons/button";
import Drawer from "../components/drawer";
import Header from "../components/header";
import OrderKdsCell from "../components/order-kds-cell";
import { useTableSalesSubscription } from "../hooks/useSalesGraphQL";
import useUser from "../hooks/useUser";
import Loading from "../components/loading";

export default function Kds() {
  const user = useUser();
  function getUpdatedAt() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  }
  const { tableSales, loading, error } = useTableSalesSubscription(
    user?.restaurant.id ?? 0,
    getUpdatedAt(),
  );

  return (
    <>
      <SectionWrapper
        hasScreenWidth
        hasScreenHeight
        className="items-center justify-center bg-background"
      >
        <FB fd="row" h="h-full" va="start" className="w-full">
          <Drawer />
          <FB
            fd="column"
            va="start"
            className="ml-[80px] min-h-[100vh] w-full bg-background"
          >
            <Header />
            {loading ? (
              <Loading />
            ) : (
              <FB
                fd="column"
                va="start"
                className="my-4 h-full w-[calc(100%-40px)] rounded-xl bg-background2 p-8"
              >
                <FB className="mb-4 gap-2">
                  <H2 className="text-[white]">KDS </H2>
                  <H2 className="!font-normal text-[white]">
                    {" "}
                    (Kitchen Display System)
                  </H2>
                </FB>
                <div className="grid w-full grid-cols-4 gap-4">
                  {tableSales?.map((tableSale) => {
                    return (
                      <OrderKdsCell
                        data={tableSale.data}
                        id={tableSale.id}
                        nomeMesa={tableSale.table.name}
                      />
                    );
                  })}
                </div>
              </FB>
            )}
          </FB>
        </FB>
      </SectionWrapper>
    </>
  );
}
