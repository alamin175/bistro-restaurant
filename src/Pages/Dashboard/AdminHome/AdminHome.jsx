import { useQuery } from "@tanstack/react-query";
import {
  FaAddressBook,
  FaDollarSign,
  FaShippingFast,
  FaUsers,
} from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../../AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Helmet } from "react-helmet";

const AdminHome = () => {
  const { user } = useContext(UserContext);
  const axiosSecure = useAxiosSecure();
  const { data: adminStats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats", adminStats);
      return res.data;
    },
  });

  const { data: categoryData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });
  console.log(categoryData);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];

  // console.log(category);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = categoryData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="w-11/12">
      <Helmet>
        <title>Admin Home-Bistro Boss</title>
      </Helmet>
      <h1 className="text-2xl md:text-4xl mb-4 ">
        Welcome!!
        <span className="text-yellow-500">
          {user.displayName ? user.displayName : "Back"}
        </span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
        <div className="stat border-2 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl"></FaDollarSign>
          </div>
          <div className="stat-title">Revenue </div>
          <div className="font-bold text-2xl lg:stat-value">
            ${adminStats.revenue}
          </div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat border-2 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl"></FaUsers>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="font-bold text-2xl lg:stat-value">
            {adminStats.users}
          </div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat border-2 rounded-lg">
          <div className="stat-figure text-secondary">
            <FaAddressBook className="text-3xl"></FaAddressBook>
          </div>
          <div className="stat-title">Total Menu</div>
          <div className="font-bold text-2xl lg:stat-value">
            {adminStats.menu}{" "}
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        <div className="stat border-2 rounded-lg ">
          <div className="stat-figure text-secondary">
            <FaShippingFast className="text-3xl -ml-4"></FaShippingFast>
          </div>
          <div className="stat-title">Total Orders</div>
          <div className="font-bold text-2xl lg:stat-value">
            {adminStats.orders}{" "}
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      <div className="md:flex">
        <div className="">
          <BarChart
            className="w-11/12"
            width={500}
            height={300}
            data={categoryData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
