
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, TextInput, Switch, Button } from "react-native";
import CourseRow from "./components/CourseRow";
import Timer from "./components/Timer";

const courses = [
  { id: "c1", code: "CS-201", title: "Data Structures", credits: 4, seats: 12 },
  { id: "c2", code: "CS-210", title: "Databases", credits: 3, seats: 0 },
  { id: "c3", code: "SE-301", title: "Software Design", credits: 3, seats: 5 },
  { id: "c4", code: "SE-310", title: "Web Systems", credits: 3, seats: 20 },
  { id: "c5", code: "CS-220", title: "Operating Systems", credits: 3, seats: 10 },
  { id: "c6", code: "CS-230", title: "Computer Networks", credits: 3, seats: 15 },
  { id: "c7", code: "SE-320", title: "Mobile Development", credits: 3, seats: 0 },
  { id: "c8", code: "CS-240", title: "Artificial Intelligence", credits: 3, seats: 8 },
];

const fakeServer = (url) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const ok = url.endsWith("/courses");
      const empty = url.endsWith("/none");

      resolve({
        ok: ok || empty,
        status: ok || empty ? 200 : 404,
        json: async () => (empty ? [] : courses),
      });
    }, 1200);
  });

export default function App() {

  const [showTimer, setShowTimer] = useState(true);
  const [search, setSearch] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const [courseData, setCourseData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
const [url, setUrl] = useState("https://api.test/courses");

  
  useEffect(() => {
    console.log("Screen opened:", new Date().toLocaleString());
  }, []);

  
  useEffect(() => {
    console.log("Search changed:", search);
  }, [search]);

  
  useEffect(() => {
    async function loadCourses() {
      setStatus("loading");
      setError("");

      try {
        const response = await fakeServer(url);

        if (!response.ok) {
          throw new Error("Failed to load courses: " + response.status);
        }

        const data = await response.json();

        setCourseData(data);

        if (data.length === 0) {
          setStatus("empty");
        } else {
          setStatus("success");
        }

      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }

    loadCourses();
  }, [url]);

  
  function retryRequest() {
    setUrl("https://api.test/courses");
  }

 
  const filteredCourses = courseData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase());

    const matchesAvailability = !availableOnly || course.seats > 0;

    return matchesSearch && matchesAvailability;
  });

  return (
    <View style={styles.container}>

      <Text style={styles.student}>
        BSEF24M020-SARAH TARIQ
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search courses"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Available Only</Text>
        <Switch
          value={availableOnly}
          onValueChange={setAvailableOnly}
        />
      </View>

      {showTimer && <Timer />}

      <Button
        title={showTimer ? "Hide Timer" : "Show Timer"}
        onPress={() => setShowTimer(!showTimer)}
      />

      {status === "loading" && (
        <Text style={styles.message}>
          Loading courses...
        </Text>
      )}

      {status === "error" && (
        <View>
          <Text style={styles.errorMessage}>
            Error: {error}
          </Text>

          <Button
            title="Retry"
            onPress={retryRequest}
          />
        </View>
      )}

      {status === "empty" && (
        <Text style={styles.message}>
          No courses available on the server
        </Text>
      )}

      {status === "success" && (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseRow
              code={item.code}
              title={item.title}
              seats={item.seats}
            />
          )}
          ListHeaderComponent={
            <Text style={styles.header}>
              Total Courses: {filteredCourses.length}
            </Text>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              No courses found
            </Text>
          }
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  student: {
    textAlign: "center",
    marginBottom: 15,
    color: "white",
  },
  switchRow: {
    alignItems: "center",
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  switchText: {
    color: "white",
  },
  header: {
    fontSize: 10,
    fontWeight: "bold",
    padding: 15,
    color: "white",
  },
  empty: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
    color: "white",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
  input: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
  },
  message: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
});
